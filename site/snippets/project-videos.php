<?php
    $videos = $page->videos();
    if ($page->hasVideos() === false) {
        return false;
    }
?>

<div class="videoplayer__wrapper">
    <div class="fn-videoplayer videoplayer">
        <div class="videoplayer__video videoeffect--wobble">
            <?php foreach ($page->videos() as $video): ?>
            <video class="videoplayer__video fn-video" muted="true" loop="true" lazy="true" preload="metadata"
                data-file="<?= $video->filename(); ?>">
                <source src=" <?= $video->url() ?>" type="<?= $video->mime() ?>">
            </video>
            <?php endforeach ?>
        </div>
        <canvas class="videoeffect--snow videoplayer__canvas fn-snow"></canvas>
        <canvas class="videoeffect--vcr videoplayer__canvas fn-vcr"></canvas>
        <div class="videoeffect--scanlines videoplayer__overlay"></div>
        <div class="videoeffect--vignette videoplayer__overlay"></div>
    </div>
</div>