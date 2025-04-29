<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
// use Illuminate\Foundation\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance;
use Illuminate\Foundation\Http\Middleware\TrimStrings;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Illuminate\Routing\Middleware\SubstituteBindings;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(TrustProxies::class);
        $middleware->append(HandleCors::class);
        $middleware->append(PreventRequestsDuringMaintenance::class);
        $middleware->append(TrimStrings::class);
        $middleware->append(ConvertEmptyStringsToNull::class);

        // Middleware Web Group
        $middleware->web(append: [
            StartSession::class,
            ShareErrorsFromSession::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            SubstituteBindings::class,
            // AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Middleware API Group
        $middleware->api(append: [
            SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
