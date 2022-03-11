#!/bin/bash


pwd=$(pwd)
parentdir="$(dirname "$pwd")"
cd $parentdir
pwd=$(pwd)
echo $pwd

MY_PATH=$(dirname "$0")
echo $MY_PATH
parentdir="$(dirname "$MY_PATH")"
cd $parentdir
pwd=$(pwd)
echo "$pwd"
