<?php
if (merx()->cart()->isEmpty()) {
  go('/');
}
if (kirby()->request()->method() === 'POST') {
  
  try {
    $data = $_POST;
    $redirect = merx()->initializePayment($data);
    go($redirect);
  } catch (Exception $ex) {
    echo $ex->getMessage();
  }
}
var_dump("got here?");

  return function (\Kirby\Cms\Site $site) {
    var_dump("get here");
    $orderBlueprint = Kirby\Cms\Blueprint::factory('pages/order', null, $site);
    $orderBlueprintSection = $orderBlueprint->section('personalData');

    return [
      'fields' => $orderBlueprintSection ? $orderBlueprintSection->toArray()['fields'] : [],
      'message' => merx()->getMessage(),
    ];
  };
