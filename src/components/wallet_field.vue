<template>
  <div class="wallet-field" :class="{ disable, 'disable-hover': disableHover }">
    <div v-if="label" class="label row items-center" :disabled="disable">
      {{ label }}
      <span v-if="optional" class="optional"
        >({{ $t("fieldLabels.optional") }})</span
      >
    </div>
    <div
      class="content row items-center"
      :class="{ error: showError }"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <slot></slot>
    </div>
    <div v-if="showError && errorLabel" class="error-label" :disabled="disable">
      {{ errorLabel }}
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletField",
  props: {
    label: {
      type: String,
      required: false,
      default: undefined
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    errorLabel: {
      type: String,
      required: false,
      default: undefined
    },
    optional: {
      type: Boolean,
      required: false,
      default: false
    },
    disable: {
      type: Boolean,
      required: false,
      default: false
    },
    disableHover: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      editing: false,
      // Vuelidate marks several fields as touched merely by focus/blur.  Keep
      // that incidental state from painting a permanent red border.  Once the
      // value becomes valid the suppression is reset, so a later genuine
      // validation failure can still be displayed.
      suppressInteractionError: false
    };
  },
  computed: {
    showError() {
      return this.error && !this.editing && !this.suppressInteractionError;
    }
  },
  watch: {
    error(value) {
      if (!value) {
        this.suppressInteractionError = false;
      }
    }
  },
  methods: {
    handleFocusIn() {
      this.editing = true;
      this.suppressInteractionError = true;
    },
    handleFocusOut(event) {
      // Moving between controls inside one WalletField (for example from the
      // address input to its address-book button) is not leaving the field.
      if (event.currentTarget.contains(event.relatedTarget)) return;
      this.editing = false;
    }
  }
};
</script>

<style lang="scss">
.wallet-field {
  .label {
    margin: 6px 0;
    font-weight: bold;
    font-size: 12px;

    // Disable text selection
    -webkit-user-select: none;
    user-select: none;
    cursor: default;

    .optional {
      font-weight: 400;
      margin-left: 4px;
    }
  }
  .content {
    border-radius: 3px;
    padding: 2px 8px;
    min-height: 28px;

    > * {
      margin-right: 4px;
    }

    > *:last-child {
      margin-right: 0px;
    }

    .q-input,
    .q-textarea,
    .q-select {
      flex: 1;
      margin: 0;

      * {
        color: var(--jude-text);
      }
    }

    // 全部单行字段统一 24px 内部高度（客户第八批反馈：框高减半且所有框必须等高）；
    // textarea 走 height:auto 自增长，不能一并压扁
    .q-field--dense:not(.q-textarea) {
      .q-field__control,
      .q-field__marginal {
        height: 24px;
        min-height: 24px;
      }

      .q-field__marginal {
        font-size: 18px;
      }

      // Quasar 默认 line-height 28px 按 40px 控件设计，24px 控件里文字会沉底不居中；
      // q-select 带 q-field--auto-height，native 另有 min-height 40px 也要压掉
      .q-field__native,
      .q-field__input,
      .q-field__prefix,
      .q-field__suffix {
        padding-top: 0;
        padding-bottom: 0;
        min-height: 24px;
        line-height: 24px;
      }
    }

    .q-date {
      min-width: 100%;
      max-width: 100%;
    }

    // Quasar 的按钮 padding/min-height 实际落在内层 .q-btn__wrapper 上，
    // 必须一并压掉，否则带按钮的字段会比纯输入框高、各框高度不齐
    .q-btn {
      height: 24px;
      min-height: 24px;
      padding: 0;
      font-size: 12px !important;

      .q-btn__wrapper {
        padding: 0 8px;
        min-height: 0;
      }

      .q-icon {
        font-size: 18px;
      }
    }
  }
}
</style>
