<?php
snippet('header');
snippet('project-videos');
?>

<?php snippet('project', ['project' => $page, 'looped' => false]); ?>


<section hidden>
    <?= $page->hidden_text()->kirbytext() ?>
</section>

<?php snippet('footer');
