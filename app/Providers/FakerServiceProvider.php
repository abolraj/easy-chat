<?php

namespace App\Providers;

use Faker\Factory;
use Faker\Generator;
use Illuminate\Support\ServiceProvider;
use Smknstd\FakerPicsumImages\FakerPicsumImagesProvider;

class FakerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->singleton(Generator::class, function () {
            $faker = Factory::create();
            $faker->addProvider(new FakerPicsumImagesProvider($faker));
            return $faker;
        });
    }
}
