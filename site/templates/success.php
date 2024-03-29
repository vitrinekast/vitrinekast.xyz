<?php

/**
 * In this template the payment completion is happening.
 * The page is called after the user has entered its payment details –
 * either on the checkout page or on an external website like PayPal.
 * The route for this page is generated by Merx automatically. By default
 * the route is /success (https://merx.wagnerwagner.de/docs/options#successpage)
 */

$merx = merx();
try {
    var_dump("get orde rpage");
    var_dump($data);
    $orderPage = $merx->completePayment($_GET);
    var_dump($orderPage);
    go($orderPage->url());
} catch (Exception $ex) {
    var_dump("got exception");
    var_dump($ex->getMessage());
    
    /**
     * When something went wrong, the error message is stored (in the users session)
     * and retrieved on the checkout page.
     * Here is a good place to log theses exceptions. (https://getkirby.com/search?q=log&area=plugin)
     */
    $merx::setMessage($ex->getMessage());
    $site->checkoutPage()->go();
}
