<!DOCTYPE html>
<html lang="en">

<head>
    <!-- TODO insert Google Analytics via Fields-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title><?= $site->title() ?> | <?= $page->title() ?>
    </title>

    <link rel="shortcut icon" type="image/x-icon" href="<?= url('favicon.ico') ?>">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="/assets/img/favicon/site.webmanifest">
    <link rel="mask-icon" href="/assets/img/favicon/safari-pinned-tab.svg" color="#000000">
    <meta name="msapplication-TileColor" content="#000000">
    <meta name="theme-color" content="#ffffff">


    <meta name="author" content="[[author]]">
    <meta name="description" content="[[description]]">
    <meta name="keywords" content="">

    <meta property="og:type" content="website">
    <meta property="og:title" content="[[OGTITLE]]">

    <meta property="og:image" content="[[OGTITLE]]">
    <meta property="og:description" content="<?= $site->description(); ?>">
    <meta property="og:url" content="OGURL">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;&display=swap" />

    <?= css(['assets/style.css?v=' . date('h:i:sa') ,'@auto']) ?>
    <?= css('assets/css/print.css', 'print') ?>


    <!-- Matomo -->
    <script>
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
        var u = "//vitrinekast.xyz/analytics/";
        _paq.push(['setTrackerUrl', u + 'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
        g.async = true;
        g.src = u + 'matomo.js';
        s.parentNode.insertBefore(g, s);
    })();
    </script>
    <!-- End Matomo Code -->

</head>

<body>