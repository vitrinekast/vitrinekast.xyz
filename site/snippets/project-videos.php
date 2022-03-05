<?php
    $data = $pages->find('tvitems')->children()->published()->flip();
?>

<div class="videoplayer__wrapper">
    <div class="fn-videoplayer videoplayer">
        <div class="videoplayer__video videoeffect--wobble">
            <?php
                foreach ($data as $item):
                    if ($video = $item->visual()->toFile()): ?>
            <video class="videoplayer__video fn-video" data-show-slug="<?= $item->slug(); ?>" src="<?= $video->url() ?>"
                muted="true" loop="true" lazy="true"></video>
            <?php
                    endif;
                endforeach;
            ?>
        </div>
        <canvas class="videoeffect--snow videoplayer__canvas fn-snow"></canvas>
        <canvas class="videoeffect--vcr videoplayer__canvas fn-vcr"></canvas>
        <div class="videoeffect--scanlines videoplayer__overlay"></div>
        <div class="videoeffect--vignette videoplayer__overlay"></div>
    </div>
</div>