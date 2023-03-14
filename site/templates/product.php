<?php
snippet('header');
snippet('project-videos');

$children = $page->children();

?>


  <main class="grid product" data-id="<?= $page->id() ?>">
    <h1 data-width="1/1"><?= $page->title() ?></h1>
    
    <img style="max-width: 100px; object-fit: contain;height: auto;"
      src="<?= $page->thumb()->toFile()->thumb('default')->url() ?>"
      alt="<?= $page->thumb()->toFile()->alt() ?>"
      width="<?= $page->thumb()->toFile()->thumb('default')->width() ?>"
      height="<?= $page->thumb()->toFile()->thumb('default')->height() ?>"
      data-width="2/3"
    >
    <div class="stack-m" data-width="1/3">

      <div class="blocks">
        <?= $page->blocks()->toBlocks() ?>
      </div>
      <div class="price">
        <?= $page->price()->toformattedPrice() ?>
      </div>

      <div class="stack-s">
        
        <form action="<?= url('add') ?>" method="post">
  <h3><?= $page->title() ?></h3>
  Price: <?= formatPrice($page->price()->toFloat()) ?><br>
  Tax: <?= formatPrice(calculateTax($page->price()->toFloat(), $page->tax()->toFloat())) ?><br>
  <input type="hidden" name="id" value="<?= $page->id() ?>">
  <input type="hidden" name="url" value="<?= $page->url() ?>">
  <input type="number" name="quantity" value="1" min="1">
  <button>add to cart</button>
</form>

        <?php if ($page->stockInfo()): ?>
          <div class="color-gray-600">
            <?= $page->stockInfo() ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </main>

  <?php snippet('footer') ?>
</body>

<?php snippet('foot') ?>
