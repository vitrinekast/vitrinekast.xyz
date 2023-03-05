<?php
snippet('header');
snippet('project-videos');
?>

<?php snippet('project', ['show_todos' => false]) ; ?>


<section hidden>
    <?= $page->hidden_text()->kirbytext() ?>
</section>

<?php snippet('footer');
