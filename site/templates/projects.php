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
            <ul>
                <?php foreach ($children as $child) : ?>
                    <li><a href="<?= $child->url(); ?>"><?= $child->title(); ?> </a> </li>
                <?php endforeach; ?>
            </ul>
        </article>
    <?php endif; ?>

    <h5>Tasks</h5>
    <ul class='col col--12'>
        <?php foreach ($children as $child) : ?>
            <?php foreach ($child->todos()->toStructure() as $todo) : ?>
                <li>
                    <input type="checkbox" id="<?= $child->title() . "-" . $todo->id(); ?>" <?php echo $todo->status()->toBool() ? "checked" : "" ?>>
                    <label for="<?= $child->title() . "-" . $todo->id(); ?>">(<?= $child->title() ?>) <?= $todo->task() ?> </label>
                </li>
            <?php endforeach; ?>
        <?php endforeach; ?>

    </ul>

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
