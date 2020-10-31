<template>
  <div :class="rootClass">
    <ul :class="`${rootClass}__container`">
      <li v-for="(imgList, index) in dataImagesLocal" :key="index" :class="`${rootClass}__item`">
        <div
          :class="classThumbnailMultiple(imgList.id, imgList.disabled)"
          @click="onSelectMultipleImage(imgList)">
          <img
            :src="imgList.src"
            :id="imgList.id"
            :height="h"
            :width="w"
            :class="`${rootClass}__img`"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SelectableImageCard",
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    selectedImages: {
      type: Array,
      default: () => []
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    useLabel: {
      type: Boolean,
      default: false
    },
    rootClass: {
      type: String,
      default: "SelectableImageCard"
    },
    activeClass: {
      type: String,
      default: "--selected"
    },
    h: {
      type: String,
      default: "auto"
    },
    w: {
      type: String,
      default: "auto"
    },
    limit: {
      type: Number,
      default: 0
    },
    rows: Number,
  },
  data() {
    return {
      multipleSelected: []
    };
  },
  computed: {
    dataImagesLocal: function() {
      return this.imgList || [];
    }
  },
  mounted() {
    // set initial selectedImage
    this.setInitialSelection();
  },
  methods: {
    classThumbnailMultiple(id, isDisabled) {
      const baseClass = `${this.rootClass}__thumbnail`;
      const baseMultipleClass = `${baseClass} is--multiple`;
      if (isDisabled) {
        return `${baseMultipleClass} ${baseClass}--disabled`;
      }
      if (this.isExistInArray(id)) {
        return `${baseMultipleClass} ${baseClass}${this.activeClass}`;
      }
      return `${baseMultipleClass}`;
    },
    onSelectImage(objectImage) {
      if (!objectImage.disabled) {
        this.singleSelected = Object.assign({}, this.singleSelected, objectImage);
        this.$emit("onselectimage", objectImage);
      }
    },
    isExistInArray(id) {
      return this.multipleSelected.find(item => {
        return id === item.id;
      });
    },
    removeFromSingleSelected() {
      this.singleSelected = {};
      this.$emit("onselectimage", {});
    },
    removeFromMultipleSelected(id, dontFireEmit) {
      this.multipleSelected = this.multipleSelected.filter(item => {
        return id !== item.id;
      });
      if (!dontFireEmit) {
        this.$emit("onselectmultipleimage", this.multipleSelected);
      }
    },
    resetMultipleSelection() {
      this.multipleSelected = [];
    },
    onSelectMultipleImage(objectImage) {
      if (!objectImage.disabled) {
        if (!this.isExistInArray(objectImage.id)) {
          if (this.limit > 0) {
            if (this.multipleSelected.length < this.limit) {
              this.multipleSelected.push(objectImage);
              this.$emit("onselectmultipleimage", this.multipleSelected);
            } else {
              this.$emit("onreachlimit", this.limit);
            }
          } else {
            this.multipleSelected.push(objectImage);
            this.$emit("onselectmultipleimage", this.multipleSelected);
          }
        } else {
          this.removeFromMultipleSelected(objectImage.id, true);
          this.$emit("onselectmultipleimage", this.multipleSelected);
        }
      }
    },
    setInitialSelection() {
      if (this.selectedImages) {
        if (!this.isMultiple && this.selectedImages.length === 1) {
          this.singleSelected = Object.assign({}, this.selectedImages[0]);
        } else {
          this.multipleSelected = [].concat(this.selectedImages);
        }
      }
    }
  }
};
</script>

<style src="./SelectableImageCard.css"></style>