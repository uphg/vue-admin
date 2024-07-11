// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/vite@5.3.1_@types+node@20.12.12_sass@1.77.2/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.3.1_@types+node@20.12.12_sass@1.77.2__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.3.1_@types+node@20.12.12_sass@1.77.2__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/unplugin-auto-import@0.17.6_rollup@4.18.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.24.6_rollup@4.18.0_vue@3.4.27_typescript@5.4.5_/node_modules/unplugin-vue-components/dist/vite.js";
import UnoCSS from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/unocss@0.60.3_postcss@5.2.18_rollup@4.18.0_vite@5.3.1_@types+node@20.12.12_sass@1.77.2_/node_modules/unocss/dist/vite.mjs";
import { NaiveUiResolver } from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.24.6_rollup@4.18.0_vue@3.4.27_typescript@5.4.5_/node_modules/unplugin-vue-components/dist/resolvers.js";
import * as NativeUI from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/naive-ui@2.38.2_vue@3.4.27_typescript@5.4.5_/node_modules/naive-ui/lib/index.js";
import { createSvgIconsPlugin } from "file:///D:/Coding/Project/vue-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.1_@types+node@20.12.12_sass@1.77.2_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Coding/Project/vue-admin/vite.config.ts";
var naiveUIComponentNames = getNaiveUIComponentNames();
function getNaiveUIComponentNames() {
  const exportKeys = Object.keys(NativeUI);
  return exportKeys.filter((item) => /^N/.test(item));
}
var vite_config_default = defineConfig(({ command }) => {
  const isBuild = command === "build";
  return {
    plugins: [
      vue(),
      vueJsx(),
      // VueDevTools(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: [
          "vue",
          "vue-router",
          {
            "naive-ui": naiveUIComponentNames.concat([
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar"
            ])
          }
        ],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/components", "src/hooks", "src/stores", "src/shared"],
        eslintrc: {
          enabled: true
          // <-- this
        }
      }),
      Components({
        dts: "src/components.d.ts",
        dirs: ["src/components"],
        // file suffixes
        extensions: ["vue", "tsx"],
        resolvers: [NaiveUiResolver()],
        // resolvable file suffixes
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/]
      }),
      UnoCSS(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        svgoOptions: isBuild,
        // default
        symbolId: "icon-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/naive-ui")) {
              return "naive-ui";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RpbmdcXFxcUHJvamVjdFxcXFx2dWUtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvZGluZ1xcXFxQcm9qZWN0XFxcXHZ1ZS1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kaW5nL1Byb2plY3QvdnVlLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgKiBhcyBOYXRpdmVVSSBmcm9tICduYWl2ZS11aSdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG5jb25zdCBuYWl2ZVVJQ29tcG9uZW50TmFtZXMgPSBnZXROYWl2ZVVJQ29tcG9uZW50TmFtZXMoKVxyXG5cclxuZnVuY3Rpb24gZ2V0TmFpdmVVSUNvbXBvbmVudE5hbWVzKCkge1xyXG4gIGNvbnN0IGV4cG9ydEtleXMgPSBPYmplY3Qua2V5cyhOYXRpdmVVSSlcclxuICByZXR1cm4gZXhwb3J0S2V5cy5maWx0ZXIoKGl0ZW0pID0+IC9eTi8udGVzdChpdGVtKSlcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xyXG4gIGNvbnN0IGlzQnVpbGQgPSBjb21tYW5kID09PSAnYnVpbGQnXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICAvLyBWdWVEZXZUb29scygpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBpbmNsdWRlOiBbL1xcLlt0al1zeD8kLywgL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL10sXHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICduYWl2ZS11aSc6IG5haXZlVUlDb21wb25lbnROYW1lcy5jb25jYXQoW1xyXG4gICAgICAgICAgICAgICd1c2VEaWFsb2cnLFxyXG4gICAgICAgICAgICAgICd1c2VNZXNzYWdlJyxcclxuICAgICAgICAgICAgICAndXNlTm90aWZpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAndXNlTG9hZGluZ0JhcidcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cycsICdzcmMvaG9va3MnLCAnc3JjL3N0b3JlcycsICdzcmMvc2hhcmVkJ10sXHJcbiAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUgLy8gPC0tIHRoaXNcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ10sXHJcbiAgICAgICAgLy8gZmlsZSBzdWZmaXhlc1xyXG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ3RzeCddLFxyXG4gICAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcclxuICAgICAgICAvLyByZXNvbHZhYmxlIGZpbGUgc3VmZml4ZXNcclxuICAgICAgICBpbmNsdWRlOiBbL1xcLlt0al1zeD8kLywgL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlL11cclxuICAgICAgfSksXHJcbiAgICAgIFVub0NTUygpLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgICAgc3Znb09wdGlvbnM6IGlzQnVpbGQsXHJcbiAgICAgICAgLy8gZGVmYXVsdFxyXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bbmFtZV0nXHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvbmFpdmUtdWknKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnbmFpdmUtdWknXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJRLFNBQVMsZUFBZSxXQUFXO0FBQzlTLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBRW5CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sWUFBWTtBQUNuQixTQUFTLHVCQUF1QjtBQUNoQyxZQUFZLGNBQWM7QUFDMUIsU0FBUyw0QkFBNEI7QUFYZ0ksSUFBTSwyQ0FBMkM7QUFhdE4sSUFBTSx3QkFBd0IseUJBQXlCO0FBRXZELFNBQVMsMkJBQTJCO0FBQ2xDLFFBQU0sYUFBYSxPQUFPLEtBQUssUUFBUTtBQUN2QyxTQUFPLFdBQVcsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksQ0FBQztBQUNwRDtBQUdBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsUUFBUSxNQUFNO0FBQzNDLFFBQU0sVUFBVSxZQUFZO0FBQzVCLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQTtBQUFBLE1BRVAsV0FBVztBQUFBLFFBQ1QsU0FBUyxDQUFDLGNBQWMsVUFBVSxZQUFZO0FBQUEsUUFDOUMsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWSxzQkFBc0IsT0FBTztBQUFBLGNBQ3ZDO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRixDQUFDO0FBQUEsVUFDSDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLEtBQUs7QUFBQSxRQUNMLE1BQU0sQ0FBQyxrQkFBa0IsYUFBYSxjQUFjLFlBQVk7QUFBQSxRQUNoRSxVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUE7QUFBQSxRQUNYO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxLQUFLO0FBQUEsUUFDTCxNQUFNLENBQUMsZ0JBQWdCO0FBQUE7QUFBQSxRQUV2QixZQUFZLENBQUMsT0FBTyxLQUFLO0FBQUEsUUFDekIsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0FBQUE7QUFBQSxRQUU3QixTQUFTLENBQUMsY0FBYyxVQUFVLFlBQVk7QUFBQSxNQUNoRCxDQUFDO0FBQUEsTUFDRCxPQUFPO0FBQUEsTUFDUCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsYUFBYTtBQUFBO0FBQUEsUUFFYixVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyx1QkFBdUIsR0FBRztBQUN4QyxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
