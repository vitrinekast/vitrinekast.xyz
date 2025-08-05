<?php

use Kirby\Uuid\Uuid;

class ComponentsPage extends Page
{
    public function children(): Pages
    {
        if ($this->children instanceof Pages) {
            return $this->children;
        }

        $csv = csv($this->root() . "/components.csv", ";");

        $children = A::map(
            $csv,
            fn($component) => [
                "slug" =>
                    Str::slug($component["Category"]) .
                    Str::slug($component["Name"]),
                "template" => "component",
                "model" => "component",
                "num" => 0,
                "content" => [
                    "name" => $component["Name"],
                    "amount" => $component["Amount"],
                    "category" => $component["Category"],
                    "where" => $component["Where"],
                    "value" => $component["Value"],
                    "mountingtype" => $component["Mountingtype"],
                    "date" => $component["Date"],
                    "uuid" => Uuid::generate(),
                ],
            ],
        );

        return $this->children = Pages::factory($children, $this);
    }
}
