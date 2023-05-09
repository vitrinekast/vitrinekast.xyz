<?php
snippet('header');
snippet('project-videos');

$children = $page->children();

?>

<main class='container container--full container--static front-page'>
    <header class='col col--12 flex'>
        <h1 class='h6'>
            <?= $page->title() ?>
        </h1>
    </header>

    <?php if (count($page->description()->toBlocks()) > 0) : ?>
        <article class="col col--12">
                <?php foreach ($page->description()->toBlocks() as $block) : ?>
                    <div id="<?= $block->id() ?>" class="block block-type-<?= $block->type() ?>">
                        <?= $block ?>
                    </div>
        </article>
                <?php endforeach ?>
            <?php else : ?>
                <?php echo $page->description()->kirbytext(); ?>
            <?php endif; ?>

    <?php if (count($children) !== 0) : ?>
        <article class="col col--12">
            <ul class='d--print list--links'>
                <?php foreach ($children as $child) : ?>
                    <li><a href="#<?= $child->slug(); ?>"><?= explode(": ", $child->title())[0] ?> </a> </li>
                <?php endforeach; ?>
            </ul>

            <ul class='d--none-print list--links'>
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
