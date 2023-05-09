<?php
$cover = $project->cover()->toFile();
?>


<section class='container container--full container--static' id="<?= $project->slug(); ?>">
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

                        <figure>
                                        <picture>
                                            <source type="image/webp" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $cover->srcset(
                                                [
                                                    '600w'  => ['width' => 600, 'format' => 'webp'],
                                                    '900w'  => ['width' => 900, 'format' => 'webp'],
                                                    '1200w' => ['width' => 1200, 'format' => 'webp'],
                                                    '1800w' => ['width' => 1800, 'format' => 'webp'],
                                                ]
                                            ) ?>">

                                        <source type="image/jpg" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $cover->srcset(
                                                [
                                                    '600w'  => ['width' => 600, 'format' => 'jpg'],
                                                    '900w'  => ['width' => 900, 'format' => 'jpg'],
                                                    '1200w' => ['width' => 1200, 'format' => 'jpg'],
                                                    '1800w' => ['width' => 1800, 'format' => 'jpg'],
                                                ]
                                            ) ?>">

                                            <source type="image/png" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $cover->srcset(
                                                [
                                                    '600w'  => ['width' => 600, 'format' => 'png'],
                                                    '900w'  => ['width' => 900, 'format' => 'png'],
                                                    '1200w' => ['width' => 1200, 'format' => 'png'],
                                                    '1800w' => ['width' => 1800, 'format' => 'png'],
                                                ]
                                            ) ?>">

                                            <img
                                                alt="<?= $cover->alt() ?>"
                                                src="<?= $cover->resize(1200)->url() ?>"
                                                class="header__media spotlight media--corner" 
                                                loading="lazy" 
                                                data-title="<?= htmlspecialchars($cover->caption()); ?>"

                                                srcset="<?= $cover->srcset(
                                                            [
                                                                '600w'  => ['width' => 600],
                                                                '900w'  => ['width' => 900],
                                                                '1200w' => ['width' => 1200],
                                                                '1800w' => ['width' => 1800],
                                                            ]
                                                        ) ?>"> 
                                        </picture>
                                    </figure>
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

                            if ($file->grid_column_end()->isNotEmpty()) {
                                $css_variables .= "--column-end:" . $file->grid_column_end() . ";";
                            }

                            if ($file->grid_row_end()->isNotEmpty()) {
                                $css_variables .= "--row-end:" . $file->grid_row_end() . ";";
                            }

                            if ($file->object_fit() == "contain") {
                                $css_variables .= "--object-fit:" . $file->object_fit() . ";";
                                $css_variables .= "--object-position:left;";
                            }

                            ?>
                            <li style="<?= $css_variables ?>">

                                <?php if ($file->type() == "image") : ?>
                                    <figure>
                                        <picture>
                                            <source type="image/webp" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $file->srcset(
                                                [
                                                    '600w'  => ['width' => 600, 'format' => 'webp'],
                                                    '900w'  => ['width' => 900, 'format' => 'webp'],
                                                    '1200w' => ['width' => 1200, 'format' => 'webp'],
                                                    '1800w' => ['width' => 1800, 'format' => 'webp'],
                                                ]
                                            ) ?>">

                                        <source type="image/jpg" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $file->srcset(
                                                [
                                                    '600w'  => ['width' => 600, 'format' => 'jpg'],
                                                    '900w'  => ['width' => 900, 'format' => 'jpg'],
                                                    '1200w' => ['width' => 1200, 'format' => 'jpg'],
                                                    '1800w' => ['width' => 1800, 'format' => 'jpg'],
                                                ]
                                            ) ?>">

                                            <source type="image/png" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $file->srcset(
                                                [
                                                    '600w'  => ['width' => 600, 'format' => 'png'],
                                                    '900w'  => ['width' => 900, 'format' => 'png'],
                                                    '1200w' => ['width' => 1200, 'format' => 'png'],
                                                    '1800w' => ['width' => 1800, 'format' => 'png'],
                                                ]
                                            ) ?>">

                                            <img
                                                alt="<?= $file->alt() ?>"
                                                src="<?= $file->resize(900)->url() ?>"
                                                class="spotlight" 
                                                loading="lazy" 
                                                data-title="<?= htmlspecialchars($file->caption()); ?>"

                                                srcset="<?= $file->srcset(
                                                            [
                                                                '600w'  => ['width' => 600],
                                                                '900w'  => ['width' => 900],
                                                                '1200w' => ['width' => 1200],
                                                                '1800w' => ['width' => 1800],
                                                            ]
                                                        ) ?>"> 
                                        </picture>
                                        <figcaption><?= htmlspecialchars($file->caption()); ?> </figcaption>
                                    </figure>
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