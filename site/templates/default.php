<?php snippet('header') ?>
<?php snippet('project-videos'); ?>


<div class='container container--full container--static'>
    <header class='col col--12'>


        <div class="flex">
            <h1 class='h6'><?= $page->title() ?><span class='fn-video-loop button--link'>.play()</span>
            </h1>

        </div>
    </header>
    <div class="col col--12">
        <article><?= $page->text()->kirbytext() ?>
        </article>
    </div>
</div>

<?php snippet('footer');