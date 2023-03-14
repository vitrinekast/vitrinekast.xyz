<?php
return [
  'debug' => true,
  'panel' => [
    'install' => true
  ],
  'markdown' => [
    'extra' => true
  ],
  [
    'ww.merx.stripe.test.publishable_key' => 'pk_test_xxx…',
    'ww.merx.stripe.test.secret_key' => 'sk_test_xxx…',
    'ww.merx.stripe.live.publishable_key' => 'pk_live_xxx…',
    'ww.merx.stripe.live.secret_key' => 'sk_live_xxx…',
    'ww.merx.paypal.sandbox.clientID' => 'xxx…',
    'ww.merx.paypal.sandbox.secret' => 'xxx…',
    'ww.merx.paypal.live.clientID' => 'xxx…',
    'ww.merx.paypal.live.secret' => 'xxx…',
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
