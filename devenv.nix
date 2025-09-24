{ pkgs, ... }:
{
  env.PUPPETEER_BROWSER = "firefox";
  env.PUPPETEER_EXECUTABLE_PATH = if pkgs.stdenv.isDarwin then
    "${pkgs.firefox}/Applications/Firefox.app/Contents/MacOS/firefox"
  else
    "${pkgs.firefox}/bin/firefox";

  languages.deno.enable = true;
  packages = with pkgs; [ firefox ];
}
