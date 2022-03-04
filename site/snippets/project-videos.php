<?php
    $data = $pages->find('tvitems')->children()->published()->flip();
?>

<div class="videoplayer__wrapper">
    <div class="fn-videoplayer videoplayer">
        <div class="videoplayer__video videoeffect--wobble">
            <?php foreach ($data as $item): ?>
            <?php if ($video = $item->visual()->toFile()): ?>
            <video class="videoplayer__video fn-video" data-show-slug="<?= $item->slug(); ?>" src="<?= $video->url() ?>"
                muted="true" loop="true" controls="true" lazy="true"></video>
            <?php endif ?>
            <?php endforeach ?>
        </div>
        <canvas class="videoeffect--snow videoplayer__canvas fn-snow" width="320" height="180"></canvas>
        <canvas class="videoeffect--vcr videoplayer__canvas fn-vcr" width="640" height="360"></canvas>
        <div class="videoeffect--scanlines videoplayer__overlay"></div>
        <div class="videoeffect--vignette videoplayer__overlay"></div>
    </div>
</div>