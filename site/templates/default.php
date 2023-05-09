<?php
    snippet('header');
    snippet('project-videos');

    $children = $page->children();
    
    
?>

<main class='container container--full container--static'>
    <?php if($page->hide_title()->toBool() == false): ?>
    <header class='col col--12 flex'>
        <h1 class='h6'>
            <?= $page->title() ?>
        </h1>
    </header>

    <?php endif; ?>

   <?php if(count($children) !== 0): ?>
        <article class="col col--12">
            <ul>
                <?php foreach($children as $child): ?>
                    <li><a href="<?= $child->url();?>"><?= $child->title(); ?> </a> </li>
                <?php endforeach; ?>
            </ul>
                </article>
    <?php endif; ?>

    <div class="col col--12">
        <article>
            <?= $page->text()->kirbytext() ?>

            <?php if (count($page->description()->toBlocks()) > 0) : ?>
                <?php foreach ($page->description()->toBlocks() as $block) : ?>
                    <div id="<?= $block->id() ?>" class="block block-type-<?= $block->type() ?>">
                        <?= $block ?>
                    </div>
                <?php endforeach ?>
            <?php endif; ?>
        </article>

    </div>
</main>

<section hidden>
    <?= $page->hidden_text()->kirbytext() ?>
</section>

<?php snippet('footer');