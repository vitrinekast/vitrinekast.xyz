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
                    
                        <img
                            alt="<?= $cover->alt() ?>"
                            src="<?= $cover->resize(900)->url() ?>"
                            class="header__media spotlight media--corner" loading="lazy" data-title="<?= htmlspecialchars($cover->caption()); ?>"
                            srcset="<?= $cover->srcset(
                                [
                                    '300w'  => ['width' => 300],
                                    '1200w' => ['width' => 1200],
                                    '1800w' => ['width' => 2200],
                                ]
                            )?>"
                            width="<?= $cover->resize(2200)->width() ?>"
                            height="<?= $cover->resize(2200)->height() ?>"
                        >
                    <?php else : ?>
                        <video alt="" class="header__media media--corner d--none-print" controls>
                            <source type="video/mp4" src="<?= $cover->url() ?>">
                        </video>
                       
                        <?php $file = $project->other_files()->toFiles()->first(); ?>
                       
                        <?php if($file): ?>
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

                <ul class='list--images spacer--y'>
                    <?php foreach ($project->other_files()->toFiles() as $file) : ?>
                        <?php if ($file->uuid() != $cover->uuid()) : ?>
                            <li <?php if($file->asp_ratio()) { 
                                echo 'style="--aspect-ratio: ' . $file->asp_ratio() . ';"';
                             } 
                             ?>
                                <?php if ($file->type() == "image") : ?>
                                    <figure>
                                    <img
                                        alt="<?= $file->alt() ?>"
                                        src="<?= $file->resize(900)->url() ?>"
                                        class="spotlight media--corner" loading="lazy" data-title="<?= htmlspecialchars($file->caption()); ?>"
                                        srcset="<?= $file->srcset(
                                            [
                                                '600w'  => ['width' => 600],
                                                '900w'  => ['width' => 900],
                                                '1200w' => ['width' => 1200],
                                                '1800w' => ['width' => 1800],
                                            ]
                                        )?>"
                                        width="<?= $file->resize(1800)->width() ?>"
                                        height="<?= $file->resize(1800)->height() ?>"
                                    >
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

            <?php endif; ?>
        </section>
    </div>
</section>