<?php

/*
 * This file is part of raafirivero/kine-top.
 *
 * Copyright (c) 2020 Raafi Rivero.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace RaafiRivero\KineTop;

use Flarum\Extend;
use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface as Request;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->content(function (Document $document, Request $request) {
            $document->head[] = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/tiny-slider.css">';
        }),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less')
];

