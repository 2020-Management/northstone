source "https://rubygems.org"

# Pinned to the bundle GitHub Pages currently runs. Building locally with
# this gem mirrors what GitHub will build on push.
gem "github-pages", group: :jekyll_plugins

# Local + CI link checker. Crawls the built _site for dead internal links,
# broken anchors and missing images — things `jekyll build` does not catch.
group :test do
  gem "html-proofer", "~> 5.0"
end
