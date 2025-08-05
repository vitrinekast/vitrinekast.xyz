<?php snippet('header') ?>

<article class="animal">
  <h1 class="animal-scientific-name"><?= $page->title() ?></h1>
  <p class="animal-common-name">Common name: <?= $page->category() ?></p>
  <div class="animal-description">
    <?= $page->description()->kt() ?>
  </div>
</article>

<?php snippet('footer') ?>
