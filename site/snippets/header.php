<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title><?= $site->title() ?> | <?= $page->title() ?>
    </title>

    <link rel="shortcut icon" type="image/x-icon" href="<?= url('favicon.ico') ?>">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffc40d">
    <meta name="theme-color" content="#000">

    <meta name="author" content="[[author]]">
    <meta name="description" content="[[description]]">
    <meta name="keywords" content="">

    <meta property="og:type" content="website">
    <meta property="og:title" content="[[OGTITLE]]">

    <meta property="og:image" content="[[OGTITLE]]">
    <meta property="og:description" content="<?= $site->description(); ?>">
    <meta property="og:url" content="OGURL">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <?= css(['assets/style.css?v=' . date('h:i:sa'), '@auto']) ?>
    <!-- <?= css('assets/print.css', 'print') ?>
    -->

    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    

    <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap">
    </noscript>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script src="https://rawcdn.githack.com/nextapps-de/spotlight/0.7.8/dist/spotlight.bundle.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-6FM1YBVTSX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-6FM1YBVTSX');
    </script>
    <?php snippet('meta_information'); ?>
    <?php snippet('robots'); ?>
</head>

<body>