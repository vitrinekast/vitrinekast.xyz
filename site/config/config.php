<?php

function sendConfirmationMail($orderPage)
{
  var_dump('send confirmation email');
  kirby()->email([
    'from' => 'info@my-shop.com',
    'to' => (string)$orderPage->email(),
    'subject' => 'Thank’s for your order!',
    'body' => 'Dear ' . $orderPage->name() . ', you have paid ' . formatPrice($orderPage->cart()->getSum()),
  ]);
}

return [
  'debug' => true,
  'panel' => [
    'install' => true
  ],
  'markdown' => [
    'extra' => true
  ],
  'ww.merx.ordersPage' => 'orders',
  'ww.merx.gateways' => [
    'prepayment' => [],
    'pay-by-exchange' => [
      'initializePayment' => function (OrderPage $virtualOrderPage): OrderPage {
        var_dump("my-payment-provider: init");
        $sum = $virtualOrderPage->cart()->getSum();
        // do something to get a redirect url
        $redirectUrl = 'https://mypaymentprovider.com/payment/mlDquvqMQK85M1Pw';
        $virtualOrderPage->content()->update([
          'redirect' => "success",
        ]);
        return $virtualOrderPage;
      },
      'completePayment' => function (OrderPage $virtualOrderPage, array $data): OrderPage {
        var_dump("my-payment-provider: complete");

        $virtualOrderPage->content()->update([
          'paymentComplete' => true,
          'paidDate' => date('c'),
        ]);

        return $virtualOrderPage;
      }
    ],
  ],

  'hooks' => [
    'page.update:after' => function ($newPage, $oldPage) {
      if ($newPage->intendedTemplate()->name() === 'order' && $newPage->isListed()) {
        /**
         * For the “prepayment” payment method the paidDate is not set automatically after
         * the user completes the checkout (as in contrast to e.g. PayPal or credit card payment).
         * This hook sets the paid date when paymentComplete field switches form false to true.
         */
        if ($newPage->paymentComplete()->toBool() !== $oldPage->paymentComplete()->toBool()) {
          if ($newPage->paymentComplete()->isTrue()) {
            kirby()->impersonate('kirby');
            $newPage = $newPage->update([
              'paidDate' => date('c'),
            ]);
          } else {
            $newPage->update([
              'paidDate' => '',
            ]);
          }
        }
      }
    },

    'ww.merx.cart' => function ($cart) {
      /**
       * Update shipping
       * https://merx.wagnerwagner.de/cookbooks/shipping-costs-and-discounts
       */
      $site = site();
      if ($site->shippingPage()) {
        $shippingId = $site->shippingPage()->id();
        $freeShipping = $site->shippingPage()->freeShipping()->or('0')->toFloat();

        // $cart->remove($shippingId);
        if ($cart->count() > 0 && $cart->getSum() < $freeShipping) {
          $cart->add($shippingId);
        }
      }
    },
    'ww.merx.completePayment:after' => function (OrderPage $orderPage) {
      sendConfirmationMail($orderPage);

      if (option('debug') !== true) {
        foreach ($orderPage->cart() as $cartItem) {
          $productPage = page($cartItem['id']);
          if ($productPage && $productPage->stock()->isNotEmpty()) {
            $stock = $productPage->stock()->toFloat();
            $productPage->update([
              'stock' => $stock - (float)$cartItem['quantity'],
            ]);
          }
        }
      }
    },
  ],
  'routes' => [
    [
      'pattern' => 'add',
      'method' => 'post',
      'action'  => function () {
        $id = get('id');
        $quantity = get('quantity');
        $return = get('url');

        try {
          cart()->add([
            'id' => $id,
            'quantity' => $quantity,
          ]);
          go('/checkout');
        } catch (Exception $ex) {
          return $ex->getMessage();
        }
      },
    ],
    [
      'pattern' => 'sitemap.xml',
      'action'  => function () {
        $pages = site()->pages()->index();

        // fetch the pages to ignore from the config settings,
        // if nothing is set, we ignore the error page
        $ignore = kirby()->option('sitemap.ignore', ['error']);

        $content = snippet('sitemap', compact('pages', 'ignore'), true);

        // return response with correct header type
        return new Kirby\Cms\Response($content, 'application/xml');
      }
    ],
    [
      'pattern' => 'sitemap',
      'action'  => function () {
        return go('sitemap.xml', 301);
      }
    ]
  ],
  'sitemap.ignore' => ['error'],


];
