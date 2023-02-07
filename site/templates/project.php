<?php
snippet('header');
snippet('project-videos');

$children = $page->children();
$todos = $page->todos()->toStructure();
?>

<main class='container container--full container--static'>
    <header class='col col--12 flex'>
        <h1 class='h6'>
            <?php echo $page->parent()->title() . "/" . $page->title() ?>
        </h1>
        <p><?= $page->client(); ?> | <?= $page->date()->toDate("Y"); ?> </p>
    </header>



    <div class="col col--12">
        <article>

            <?php if ($image = $page->cover()->toFile()) : ?>
                <img src="<?= $image->url() ?>" alt="">
            <?php endif ?>
            <?= $page->description()->kirbytext() ?>
        </article>
        <h3>Tasks</h3>
        <ul>

            <?php foreach ($todos as $todo) : ?>
                <li>
                    <input type="checkbox" id="<?= $todo->id(); ?>" disabled <?php echo $todo->status()->toBool() ? "checked" : "" ?>>
                    <label for="<?= $todo->id(); ?>"><?= $todo->task() ?></label>
                </li>
            <?php endforeach; ?>
        </ul>

        <h3>files</h3>
        <ul class='list--images'>
            <?php foreach($page->files() as $file) : ?>
                <li>
                <img src="<?= $file->url() ?>" alt="">
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</main>

<section hidden>
    <?= $page->hidden_text()->kirbytext() ?>
</section>

<?php snippet('footer');
