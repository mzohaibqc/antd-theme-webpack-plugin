language: node_js

os:
  - osx

node_js:
  - "6"

branches:
  only:
    - master

cache:
  directories:
    - node_modules

install:
  - npm install

script:
  - npm run build

after_script:
  - cd dist
  - git init
  - git config --global user.name 'xLsDg'
  - git config --global user.email 'xlsdg@qq.com'
  - git add .
  - git commit -m "Update demo"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages

env:
  global:
    - GH_REF: github.com/xlsdg/dva-antd-starter.git
    - secure: "SRBFt3CRXKYQDyo5DR+ApupIHF64UM2bjT5yu5OvqF03UOOwpUrkIB4t3gY6zITv3J5w1ZbiH2kHqlLz27HCd/3WFBckjPrjCg1mEPIcoclK1GgLxVYPeApc8X5WfmxeCiVZv/E99gj4BQxAk7ArawAMK32Mtljv8EvI7XtMByq7Nu4Ql63XM5Uu9vKMOF8CBkqZeZiEOe4Vv5nv2b7VoRLtoudc/LYrnupARoL96dj0ERoh7wvyLXHQRGWqfBcp73CupUkZgWq3JQuqIrOpaUyygXryRKu140gj7SbgCWDNty5VX3G1gp0/y0ahQSzv7BFSwCHNvd0Ss0gEhY3UUJ7E0+5z/Kb25HmKbQzJQDTuhF0uPeE4/rwqvo8zoLVT7NEaGrJio/gxF9NRZDWthfInJTRe7EHsvZxFiTo2iTMjSg66/1fKXDHPVdLQpS/41Dsxxs2JnQelP1cP1GnH/BAc4n5+yzWR/FgliFX8h0z0D9C4E/hPKmqmxxbN/R9w3hKO4BxfE1Y1YLTjQlfg/8ug2qZ5fVyoLQ8HNmJxpM/AhEo9AiLn2Rm16ie6pByTK35qCzsDuaSUvlrK6y/jFk1F87Ia9947mW/jvjrFleGNAC6ANYpNPIijub2+0L9KdMaGvNvrk6g7XP4M9UR8HTOTkcHfTYjBH02em+3rtZw="
