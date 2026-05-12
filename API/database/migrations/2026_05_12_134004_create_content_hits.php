<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContentHits extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content_hits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tree_id');
            $table->boolean('unique_hit')->default(FALSE);
            $table->string('session_id')->nullable();
            $table->string('user_ip', 15)->nullable();
            $table->string('user_agent')->nullable();
            $table->string('referer')->nullable();
            $table->string('path')->nullable();
            $table->index('tree_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('content_hits');
    }
}
