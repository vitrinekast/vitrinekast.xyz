<?php
    $data = $pages->find('tvitems')->children()->published()->flip();
?>

<header class="header--fixed">
    <a class="button fn-video-loop button--icon" href="">
        <span class="button__icon icon icon--svg">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
            </svg>
        </span>
        <span class="button__label">LOOP</span>
    </a>
</header>

<div class="videoplayer__wrapper">
    <div class="fn-videoplayer videoplayer">
        <div class="videoplayer__video videoeffect--wobble">
            <?php
                foreach ($data as $item):
                    if ($video = $item->visual()->toFile()): ?>
            <video class="videoplayer__video fn-video" data-show-link="<?= $item->link(); ?>" src="<?= $video->url() ?>"
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