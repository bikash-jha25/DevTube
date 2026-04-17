export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&chart=mostPopular&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const getYoutubeVideosAPI = (pageToken = "") =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=25&chart=mostPopular&regionCode=IN&key=${GOOGLE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;

export const YOUTUBE_CHANNEL_API =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=";

// export const YOUTUBE_CHANNEL_API="https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id="+"UC_x5XG1OV2P6uZZ5FSM9Ttw&key="+ GOOGLE_API_KEY;

export const YOUTUBE_VIDEO_INFO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]";

export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  cpp: "10.2.0",
  c: "10.2.0",
};

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alex");`,

  typescript: `type Params = {
  name: string;
};

function greet(data: Params): void {
  console.log("Hello, " + data.name + "!");
}

greet({ name: "Alex" });`,

  python: `def greet(name):
    print("Hello, " + name + "!")

greet("Alex")`,

  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Alex!");
  }
}`,

  csharp: `using System;

class Program {
  static void Main(string[] args) {
    Console.WriteLine("Hello, Alex!");
  }
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, Alex!" << endl;
  return 0;
}`,

  c: `#include <stdio.h>

int main() {
  printf("Hello, Alex!\\n");
  return 0;
}`,

  php: `<?php
$name = "Alex";
echo "Hello, $name!";
?>`,
};
export const ONLINE_COMPILER_API_KEY =
  import.meta.env.VITE_ONLINE_COMPILER_API_KEY || "";

export const YOUTUBE_SEARCH_KEYWORD_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=${GOOGLE_API_KEY}&q=`;
