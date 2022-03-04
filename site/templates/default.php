<?php snippet('header') ?>
<?php snippet('project-videos'); ?>


<article class='container container--full container--static'>
    <header class='col col--12'>
        <h1 class='h6'><?= $page->title() ?>
        </h1>
    </header>
    <div class="col col--12">
        <?= $page->body_nl()->kirbytext() ?>
    </div>
</article>

<?php snippet('footer');