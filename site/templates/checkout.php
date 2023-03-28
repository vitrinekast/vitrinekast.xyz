<?php snippet('cart', ['cart' => merx()->cart()]) ?>
<form method="post">
  <h3>Customer Data</h3>
  <p>
    <label>
      Name<br>
      <input type="text" autocomplete="name" name="name">
    </label>
  </p>
  <p>
    <label>
      Email<br>
      <input type="text" autocomplete="email" name="email">
    </label>
  </p>
  <h3>Payment Methods</h3>
  <p>
    <label>
      <input type="radio" name="paymentMethod" value="pay-by-exchange">
      ye i'll give u somethign
    </label>
  </p>

  <p>
    <label>
      <input type="radio" name="paymentMethod" value="prepayment">
      Payment Method prepayment
    </label>
  </p>
  <p>
    <label>
      <input type="radio" name="paymentMethod" value="paypal">
      PayPal
    </label>
  </p>

  <h3>personal dataa</h3>

  <?php foreach ($fields as $field) : ?>
    <!-- <?= snippet(['fields/' . $field['type'], 'fields/text'], compact('field')) ?> -->
    <?php if ($field['type'] == 'headline') : ?>
      <h2 class="field" data-width="<?= $field['width'] ?>">
        <?= $field['label'] ?>
      </h2>

    <?php elseif ($field['type'] == 'toggle') : ?>


      <div class="field" data-width="<?= $field['width'] ?>" data-name="<?= $field['name'] ?>" <?php foreach ($field['when'] ?? [] as $key => $value) : ?> data-when-<?= $key ?>="<?= $value ?>" <?php endforeach; ?> data-type="checkbox">
        <input <?= Html::attr([
                  'type' => 'checkbox',
                  'name' => $field['name'],
                  'id' => $field['name'],
                  'checked' => $field['default'],
                ]) ?>>
        <label for="<?= $field['name'] ?>">
          <?= $field['label'] ?>
          <?php if ($field['required']) : ?>
            <abbr title="<?= I18n::translate('field.required') ?>">*</abbr>
          <?php endif; ?>
        </label>
        <?php if (isset($field['help'])) : ?>
          <div class="color-gray-600 text-s">
            <?= $field['help'] ?>
          </div>
        <?php endif; ?>
      </div>
    <?php else : ?>
      <div class="field" data-width="<?= $field['width'] ?>" data-name="<?= $field['name'] ?>" <?php if (array_key_exists('when', $field)) : ?> data-when='<?= json_encode($field['when']) ?>' <?php endif; ?> data-type="<?= $field['type'] ?>">
        <label for="<?= $field['name'] ?>">
          <?= $field['label'] ?>
          <?php if ($field['required']) : ?>
            <abbr title="<?= I18n::translate('field.required') ?>">*</abbr>
          <?php endif; ?>
        </label>
        <input <?= Html::attr([
                  'type' => $field['type'],
                  'name' => $field['name'],
                  'id' => $field['name'],
                  'required' => $field['required'] ?? null,
                  'placeholder' => isset($field['placeholder']) ? $field['placeholder'] : null,
                  'value' => isset($field['default']) ? $field['default'] : null,
                  'autocomplete' => isset($field['autocomplete']) ? $field['autocomplete'] : null,
                  'max' => isset($field['validate']['max']) ? $field['validate']['max'] : null,
                  'maxLength' => isset($field['validate']['maxLength']) ? $field['validate']['maxLength'] : null,
                  'min' => isset($field['validate']['min']) ? $field['validate']['min'] : null,
                  'minLength' => isset($field['validate']['minLength']) ? $field['validate']['minLength'] : null,
                ]) ?>>
        <?php if (isset($field['help'])) : ?>
          <div class="color-gray-600 text-s">
            <?= $field['help'] ?>
          </div>
        <?php endif; ?>
      </div>


    <?php endif; ?>




  <?php endforeach; ?>
  <p>
    <button>buy</button>
  </p>

</form>