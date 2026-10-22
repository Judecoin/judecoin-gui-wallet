/* eslint-disable no-template-curly-in-string */
// Configuration for your app

module.exports = function() {
  return {
    // app boot (/src/boot)
    boot: ["i18n", "axios", "vuelidate", "gateway", "timeago"],
    css: ["app.styl"],
    extras: [
      // ctx.theme.mat ? "roboto-font" : null,
      "material-icons" // optional, you are not bound to it
      // "ionicons-v4",
      // "mdi-v5",
      // "fontawesome-v5"
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: "history",
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack() {
        /*
                cfg.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules|quasar)/
                })
                */
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: "all" --- includes everything; for dev only!
    framework: {
      components: [
        "QLayout",
        "QHeader",
        "QFooter",
        "QDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QTooltip",
        "QField",
        "QInput",
        "QRadio",
        "QOptionGroup",
        "QBtn",
        "QBtnToggle",
        "QIcon",
        "QTabs",
        "QTab",
        "QRouteTab",
        "QBtnDropdown",
        "QMenu",
        "QDialog",
        "QStep",
        "QStepper",
        "QStepperNavigation",
        "QSpinner",
        "QList",
        "QItemLabel",
        "QItem",
        "QSeparator",
        "QItemSection",
        "QSelect",
        "QToggle",
        "QPageSticky",
        "QExpansionItem",
        "QCheckbox",
        "QInnerLoading",
        "QInfiniteScroll",
        "QDate",
        "QTime",
        "QScrollArea"
      ],
      directives: ["Ripple"],
      // Quasar plugins
      plugins: ["Notify", "Loading", "LocalStorage", "Dialog"]
      // iconSet: ctx.theme.mat ? "material-icons" : "ionicons-v4"
      // i18n: "de" // Quasar language
    },
    // animations: "all" --- includes all animations
    animations: [],
    pwa: {
      // workboxPluginMode: "InjectManifest",
      // workboxOptions: {},
      manifest: {
        // name: "Quasar App",
        // short_name: "Quasar-PWA",
        // description: "Best PWA App in town!",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#43BD43",
        icons: [
          {
            src: "statics/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "statics/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    cordova: {
      // id: "org.cordova.quasar.app"
    },
    electron: {
      bundler: "builder", // or "packager"
      // The renderer uses only the context-isolated preload API.
      // This also prevents Quasar from injecting require("electron").
      nodeIntegration: false,
      extendWebpack() {
        // cfg
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // Windows only
        // win32metadata: { ... }

        extraResource: ["bin"]
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "com.jude.desktop-wallet",
        productName: "jude-wallet-gui",
        copyright: "Copyright © 2024-2026 Judecoin Community",
        artifactName: "jude-wallet-gui-${version}-${os}.${ext}",

        win: {
          target: ["nsis"],
          icon: "src-electron/icons/icon.ico",
          executableName: "jude-wallet-gui",
          extraResources: [
            { from: "bin/win32", to: "bin" },
            { from: "src-electron/icons/icon.ico", to: "Jude-Wallet.ico" }
          ]
        },

        linux: {
          target: ["AppImage", "deb"],
          executableName: "jude-wallet-gui",
          icon: "src-electron/icons/linux",
          category: "Finance",
          maintainer: "Judecoin Community",
          syncDesktopName: true,
          extraResources: [{ from: "bin/linux", to: "bin" }]
        },
        // see https://www.electron.build/configuration/linux#debian-package-options
        deb: {
          packageName: "jude-wallet-gui",
          fpm: [
            "--replaces=jude-desktop-wallet",
            "--conflicts=jude-desktop-wallet",
            "--provides=jude-desktop-wallet"
          ],
          depends: [
            "libgtk-3-0",
            "libnotify4",
            "libnss3",
            "libxss1",
            "libxtst6",
            "xdg-utils",
            "libatspi2.0-0",
            "libuuid1",
            "libsecret-1-0",
            "libappindicator3-1 | libayatana-appindicator3-1"
          ]
        },

        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: "always",
          createStartMenuShortcut: true,
          shortcutName: "Jude Wallet",
          runAfterFinish: true,
          include: "packaging/windows/shortcut-icon.nsh"
        },

        files: [
          "!build/*.js",
          "!.env",
          "!dev-app-update.yml",
          "!downloads/**",
          "!dist/**",
          "!**/*.map",
          "!**/{test,tests}/**/*",
          "!**/{example,examples}/**/*",
          "!**/docs/**/*",
          "!**/.github/**/*"
        ]
      }
    }
  };
};
