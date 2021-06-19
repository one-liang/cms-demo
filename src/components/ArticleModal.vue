<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增文章</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  placeholder="請輸入圖片連結"
                  v-model="tempArticle.image"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  ref="imgUpload"
                  @change="uploadFile"
                  type="file"
                  id="customFile"
                  class="form-control"
                />
              </div>
              <img class="img-fluid mb-2" :src="tempArticle.image" />
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempArticle.imagesUrl">
                <div
                  v-for="(image, index) in tempArticle.imagesUrl"
                  class="mb-3 input-group"
                  :key="index"
                >
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempArticle.imagesUrl[index]"
                    placeholder="請輸入連結"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempArticle.imagesUrl.splice(index, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempArticle.imagesUrl[tempArticle.imagesUrl.length - 1] ||
                    !tempArticle.imagesUrl.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempArticle.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">*標題</label>
                <input
                  v-model="tempArticle.title"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="author" class="form-label">*作者</label>
                  <input
                    v-model="tempArticle.author"
                    type="text"
                    class="form-control"
                    id="author"
                    placeholder="請輸入作者"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="create_at" class="form-label">*建立時間</label>
                  <div
                    class="form-control"
                  >{{ $filters.date(tempArticle.create_at) }}</div>
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="tag" class="form-label">標籤</label>
                  <input
                    v-model="tempArticle.tag"
                    type="text"
                    class="form-control"
                    id="tag"
                    placeholder="請輸入標籤"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  v-model="tempArticle.description"
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="請輸入文章描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">*說明內容</label>
                <textarea
                  v-model="tempArticle.content"
                  type="text"
                  class="form-control"
                  id="content"
                  placeholder="請輸入產品說明內容"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    v-model="this.tempArticle.isPublic"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="true"
                    :false-value="false"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            @click="$emit('update-article', tempArticle)"
            type="button"
            class="btn btn-primary"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '@/mixins/modalMixin';

export default {
  name: 'ArticleModal',
  mixins: [ModalMixin],
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    article() {
      console.log('article: ', this.article);
      this.tempArticle = this.article;
      if (!this.tempArticle.isPublic) {
        this.tempArticle.isPublic = false;
      }
      if (this.tempArticle.create_at === undefined) {
        this.tempArticle.create_at = new Date().getTime() / 1000;
        console.log('create_at: ', this.tempArticle.create_at);
      }
      // 多圖範例
      console.log('watch article imagesUrl: ', this.tempArticle.imagesUrl);
      if (!this.tempArticle.imagesUrl) {
        this.tempArticle.imagesUrl = [];
      }
    },
  },
  data() {
    return {
      modal: {},
      tempArticle: {},
    };
  },
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.imgUpload.files[0];
      console.dir('this.$refs.imgUpload.files: ', uploadedFile);
      const formData = new FormData();
      // 增加欄位名稱到表單
      formData.append('file-to-upload', uploadedFile);

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.axios
        .post(api, formData)
        .then((res) => {
          console.log('uploadFile: ', res.data);
          if (res.data.success) {
            this.tempArticle.image = res.data.image;
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
