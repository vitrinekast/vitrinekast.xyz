<?php
snippet('header');
snippet('project-videos');

$children = $page->children();

?>

<main class='container container--full container--static'>
    <header class='col col--12 flex'>
        <h1 class='h6'>
            <?= $page->title() ?>
        </h1>
    </header>

    <?php if (count($children) !== 0) : ?>
        <article class="col col--12">
            <ul class='d--print'>
                <?php foreach ($children as $child) : ?>
                    <li><a href="#<?= $child->slug(); ?>"><?= $child->title(); ?> </a> </li>
                <?php endforeach; ?>
            </ul>

            <ul class='d--screen'>
                <?php foreach ($children as $child) : ?>
                    <li><a href="<?= $child->url(); ?>"><?= $child->title(); ?> </a> </li>
                <?php endforeach; ?>
            </ul>
        </article>
    <?php endif; ?>

    <div class="col col--12">
        <article>
            <?= $page->text()->kirbytext() ?>
        </article>

    </div>
</main>

<?php if (count($children) !== 0) : ?>
    <div class="col col--12">
        
            <?php foreach ($children as $child) : ?>
                <?php snippet('project', ['project' => $child, 'looped' => true]); ?>
            <?php endforeach; ?>
        
            </div>
<?php endif; ?>

<section hidden>
    <?= $page->hidden_text()->kirbytext() ?>
</section>

<?php snippet('footer');
