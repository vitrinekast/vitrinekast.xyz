<?php
$data =$pages->find('tvitems')->children()->published()->flip();
$json = [];
echo "oi";
foreach ($data as $item) {
    $json[] = [
      'url'    => (string)$item->url(),
      'title'  => (string)$item->title(),
      'visual' => $item->visual()->isEmpty() ? null : $item->visual()->toFile()->toArray()
    ];
}

echo json_encode($json);