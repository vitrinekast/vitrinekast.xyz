<?php
$srcset_webp =  [
    '600w'  => ['width' => 600, 'format' => 'webp'],
    '900w'  => ['width' => 900, 'format' => 'webp'],
    '1200w' => ['width' => 1200, 'format' => 'webp'],
    '1800w' => ['width' => 1800, 'format' => 'webp'],
];
$srcset_jpg =  [
    '600w'  => ['width' => 600, 'format' => 'jpg'],
    '900w'  => ['width' => 900, 'format' => 'jpg'],
    '1200w' => ['width' => 1200, 'format' => 'jpg'],
    '1800w' => ['width' => 1800, 'format' => 'jpg'],
];
$srcset_png =  [
    '600w'  => ['width' => 600, 'format' => 'png'],
    '900w'  => ['width' => 900, 'format' => 'png'],
    '1200w' => ['width' => 1200, 'format' => 'png'],
    '1800w' => ['width' => 1800, 'format' => 'png'],
];
$srcset_base = [
    '600w'  => ['width' => 600],
    '900w'  => ['width' => 900],
    '1200w' => ['width' => 1200],
    '1800w' => ['width' => 1800],
];

?>

<figure class='d--none-print'>
    <picture>
        <source type="image/webp" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $file->srcset($srcset_webp) ?>">

        <source type="image/jpg" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $file->srcset($srcset_jpg) ?>">

        <source type="image/png" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 1800px" srcset="<?= $file->srcset($srcset_png) ?>">

        <img alt="<?= $file->alt() ?>" src="<?= $file->resize($base_size)->url() ?>" class="<?= $class ?>" loading="lazy" data-title="<?= htmlspecialchars($file->caption()); ?>" srcset="<?= $file->srcset($srcset_base) ?>">
    </picture>
    <?php if($caption): ?>
        <figcaption><?= htmlspecialchars($file->caption()); ?> </figcaption>
    <?php endif;?>
</figure>

<figure class='d--print'>
    <picture>
        <img alt="<?= $file->alt() ?>" src="<?= $file->resize($base_size)->url() ?>" class="<?= $class ?>" loading="lazy" data-title="<?= htmlspecialchars($file->caption()); ?>" 
            srcset="<?= $file->srcset(['1200w' => ['width' => $print_size]]); ?>">
    </picture>
    <?php if($caption): ?>
        <figcaption><?= htmlspecialchars($file->caption()); ?> </figcaption>
    <?php endif;?>
</figure>

