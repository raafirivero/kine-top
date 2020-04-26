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
use Illuminate\Contracts\View\Factory;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
];


/// this is incomplete - perhaps it would be good, though, to create a blade
/// with the boxes I want as a scaffold.
return [
    function (Factory $view) {
        $view->addNamespace('raafirivero.kinetop', __DIR__.'/views');
    }
];

class KineTopController implements RequestHandlerInterface
{
    protected $view;
    
    public function __construct(Factory $view)
    {
        $this->view = $view;
    }
    
    public function handle(Request $request): Response
    {
        $view = $this->view->make('raafirivero.kinetop::greeting');
        
        return new HtmlResponse($view->render());
    }
}