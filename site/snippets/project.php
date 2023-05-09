<?php
$cover = $project->cover()->toFile();
?>


<section class='container container--full container--static ' id="<?= $project->slug(); ?>">
    <header class='col col--12 flex'>
        <h1 class='h6'>
            <?php if ($looped) : ?>
                <?= $project->title() ?>
            <?php else : ?>
                <a class="d--none-print" href="<?= $project->parent() ? $project->parent()->url() : null; ?>"> <?= $project->parent()->title();  ?> </a><span class="d--none-print">/</span><?= $project->title() ?>
            <?php endif; ?>


        </h1>
        <p class='spacer--y spacer--none t--capitalise'>
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
                        <?php snippet('responsive-image', ['file' => $cover, 'base_size' => 1200, 'caption' => false, 'print_size' => 1800, 'class' => 'header__media spotlight media--corner']) ?>
                    <?php else : ?>
                        <video alt="" class="header__media media--corner d--none-print" controls>
                            <source type="video/mp4" src="<?= $cover->url() ?>">
                        </video>

                        <?php $file = $project->other_files()->toFiles()->first(); ?>

                        <?php if ($file) : ?>
                            <figure class='d--print'>
                                <img src="<?= $file->url() ?>" alt="" class="spotlight media--corner" loading="lazy" data-title="<?= htmlspecialchars($file->caption()); ?>">
                                <figcaption><?= htmlspecialchars($file->caption()); ?> </figcaption>
                            </figure>
                        <?php endif; ?>
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
                <?php echo $project->description()->kirbytext(); ?>

            <?php endif; ?>
        </article>

        <section>
            <?php if (count($project->other_files()->toFiles()) > 0) : ?>

                <h5 class='spacer--top spacer--lg d--none-print'>.Files</h5>

                <ul class="grid-system <?= $project->bordered()->toBool() ? "grid-system--bordered" : "" ?>">

                    <?php foreach ($project->other_files()->toFiles() as $file) : ?>

                        <?php if ($file->uuid() != $cover->uuid()) : ?>
                            <?php
                            $css_variables = "";
                            $print_size = 700;

                            if ($file->grid_column_end()->isNotEmpty()) {
                                $css_variables .= "--column-end:" . $file->grid_column_end() . ";";
                                $print_size = 1300;
                            }

                            if ($file->grid_row_end()->isNotEmpty()) {
                                $css_variables .= "--row-end:" . $file->grid_row_end() . ";";
                                $print_size = 1300;
                            }

                            if ($file->object_fit() == "contain") {
                                $css_variables .= "--object-fit:" . $file->object_fit() . ";";
                                $css_variables .= "--object-position:left;";
                            }

                            ?>
                            <li style="<?= $css_variables ?>" class="list-item list-item--<?= $file->type() ?>">

                                <?php if ($file->type() == "image") : ?>
                                    <?php snippet('responsive-image', ['file' => $file, 'base_size' => 800, 'caption' => true, 'class' => 'spotlight', 'print_size' => $print_size]) ?>
                                <?php elseif ($file->type() == "video") : ?>
                                    <figure>
                                        <video src="<?= $file->url() ?>" alt="" class="" controls autoplay muted>
                                            <figcaption><?= htmlspecialchars($file->caption()); ?> </figcaption>
                                    </figure>
                                <?php elseif ($file->type() == "document") : ?>
                                    <a href="<?= $file->url() ?>"> <?= $file->filename() ?> </a>
                                <?php endif; ?>
                            </li>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </ul>

            <?php endif; ?>
        </section>
    </div>
</section>