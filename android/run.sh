#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.wordgame.skynda/host.exp.exponent.MainActivity
