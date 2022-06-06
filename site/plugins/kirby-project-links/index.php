<?php
// Usage:  (project: link: https://nu.nl text:nieuwelink video: moshed-2022-3-2-10-55-30.mp4)
Kirby::plugin('kirby/project-links', [
  'tags' => [
    'project' => [
      'attr' => [
        'link',
        'text',
        'video'
      ],
      'html' => function ($tag) {
          if ($tag->link) {
              return '<a class="fn-tv-link" data-video="' . $tag->video . '" href="' . $tag->link . '" target="_blank">' . $tag->text .'</a>';
          } else {
              return '<a class="fn-tv-link" data-video="' . $tag->video . '">' . $tag->text .'</a>';
          }
      }
    ]
  ]
]);