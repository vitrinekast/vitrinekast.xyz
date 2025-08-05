<?php snippet("header"); ?>
<main>
  <h1><?= $page->title() ?></h1>

  <?php echo $page->text()->kirbytext(); ?>
  <table>
    <tr>
      <th>Name</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Where</th>
      <th>date</th>
      <th>value</th>
    </tr>
    <?php foreach ($page->children() as $row): ?>
      <tr>
        <td><a href="<?= $row->url() ?>"><?= $row->name() ?></a><td>
        <td><?= $row->amount() ?><td>
        <td><?= $row->category() ?><td>
        <td><?= $row->where() ?><td>
        <td><?= $row->date() ?><td>
        <td><?= $row->value() ?><td>
      </tr>

    <?php endforeach; ?>

  </table>



</main>

<?php snippet("footer"); ?>
