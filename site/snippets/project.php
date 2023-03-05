<?php
$todos = $project->todos()->toStructure();
$cover = $project->cover()->toFile();

$has_open_todos = false;

foreach ($todos as $todo) {
    if ($todo->status()->toBool() == false) {
        $has_open_todos = true;
    }
}
?>


<main class='container container--full container--static'>
    <header class='col col--12 flex'>
        <h1 class='h6'>
            <?php if ($looped) : ?>
                <?= $project->title() ?>
            <?php else : ?>
                <a href="<?= $project->parent() ? $project->parent()->url() : null; ?>"> <?= $project->parent()->title();  ?> </a>/<?= $project->title() ?>
            <?php endif; ?>


        </h1>
        <p class='spacer--bottom spacer--none t--capitalise'>
            <small>
                <?php if ($project->werkgever() != "") : ?>
                    With <?= $project->werkgever(); ?>
                <?php endif; ?>

                <?php if ($project->date() != "") : ?>
                    in <?= $project->date(); ?>
                <?php endif; ?>

                <?php if ($project->client() != "") : ?>
                    for <?= $project->client(); ?>
                <?php endif; ?>

                <?php if ($project->materials() != "") : ?>
                    using <?= $project->materials(); ?>
                <?php endif; ?>
            </small>
        </p>


    </header>

    <div class="col col--12">
        <article>
            <?php if ($cover) : ?>
                <figure>
                    <?php if ($cover->type() == "image") : ?>
                        <img src="<?= $cover->url() ?>" alt="" class="header__media spotlight media--corner" loading="lazy" data-title="<?= htmlspecialchars($cover->caption()); ?>">
                    <?php else : ?>
                        <video  alt="" class="header__media media--corner" controls>
                        <source type="video/mp4" src="<?= $cover->url() ?>">
                    </video>
                        <?php endif; ?>
                        <figcaption><?= htmlspecialchars($cover->caption()); ?> </figcaption>



                </figure>
            <?php endif ?>

            <?php if (count($project->text()->toBlocks()) > 0) : ?>
                <?php foreach ($project->text()->toBlocks() as $block) : ?>
                    <div id="<?= $block->id() ?>" class="block block-type-<?= $block->type() ?>">
                        <?= $block ?>
                    </div>
                <?php endforeach ?>
            <?php else : ?>
                <?= $project->description()->kirbytext() ?>
            <?php endif; ?>
        </article>

        <?php if ($has_open_todos && $looped) : ?>
            <h5 class='spacer--top spacer--lg'>.Tasks</h5>

            <ul class='spacer--y'>

                <?php foreach ($todos as $todo) : ?>
                    <li>
                        <input type="checkbox" id="<?= $todo->id(); ?>" <?php echo $todo->status()->toBool() ? "checked" : "" ?>>
                        <label for="<?= $todo->id(); ?>"><?= $todo->task() ?></label>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
<?php if(count($project->other_files()->toFiles()) > 0): ?>

        <h5 class='spacer--top spacer--lg'>.Files</h5>

        <ul class='list--images spacer--y'>
            <?php foreach ($project->other_files()->toFiles() as $file) : ?>
                <?php if ($file->uuid() != $cover->uuid()) : ?>
                    <li>

                        <?php if ($file->type() == "image") : ?>
                            <figure>
                                <img src="<?= $file->url() ?>" alt="" class="spotlight media--corner" loading="lazy" data-title="<?= htmlspecialchars($file->caption()); ?>">
                                <figcaption><?= htmlspecialchars($file->caption()); ?> </figcaption>
                            </figure>
                        <?php elseif ($file->type() == "video") : ?>
                            <figure>
                                <video src="<?= $file->url() ?>" alt="" class=" media--corner" controls autoplay muted>
                                    <figcaption><?= htmlspecialchars($file->caption()); ?> </figcaption>
                            </figure>
                        <?php elseif ($file->type() == "document") : ?>
                            <a href="<?= $file->url() ?>"> <?= $file->filename() ?> </a>
                        <?php endif; ?>
                    </li>
                <?php endif; ?>
            <?php endforeach; ?>
        </ul>

<?php endif;?>
    </div>
</main>