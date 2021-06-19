<template>
  <Loading :active="isLoading"  />
  <div class="text-end">
    <button @click="openModal(true)" class="btn btn-primary" type="button">
      新增文章
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">標題</th>
        <th width="120">作者</th>
        <th>文章內容</th>
        <th width="120">建立時間</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td>{{ article.title }}</td>
        <td>{{ article.author }}</td>
        <td class="text-truncate">{{ article.description }}</td>
        <td>{{ $filters.date(article.create_at) }}</td>
        <td>
          <span v-if="true" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              @click="openModal(false, article)"
              class="btn btn-outline-primary btn-sm"
            >
              編輯
            </button>
            <button
              @click="openDelModal(article)"
              class="btn btn-outline-danger btn-sm"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getArticles" />
  <ArticleModal
    ref="articleModal"
    :article="tempArticle"
    @update-article="updateArticle"
  />
  <DeleteModal ref="delModal" :item="tempArticle" @del-item="delArticle" />
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ArticleModal from '@/components/ArticleModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  name: 'Articles',
  components: {
    Pagination,
    ArticleModal,
    DeleteModal,
  },
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      isNew: false,
      articles: {},
      tempArticle: {},
      pagination: {},
      currentPage: 1,
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    getArticles(currentPage = 1) {
      this.currentPage = currentPage;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${currentPage}`;
      this.axios(api).then((res) => {
        if (res.data.success) {
          console.log('getArticles: ', res.data);
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        }
      })
        .catch((error) => console.log(error));
    },
    openModal(isNew, item) {
      // console.log('openModal: ', isNew, item);
      if (isNew) {
        this.tempArticle = {};
      } else {
        this.tempArticle = { ...item };
      }
      this.isNew = isNew;
      this.$refs.articleModal.showModal();
    },
    updateArticle(article) {
      this.tempArticle = article;

      // 新增
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`;
        httpMethod = 'put';
      }

      this.axios[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          // console.log('updateArticle: ', res.data);
          this.$refs.articleModal.hideModal();
          if (res.data.success) {
            this.getArticles();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        })
        .catch((error) => console.log(error));
    },
    openDelModal(article) {
      // console.log('openDelModal: ', article);
      this.tempArticle = { ...article };
      this.$refs.delModal.showModal();
    },
    delArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.axios
        .delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal();
          if (res.data.success) {
            // console.log('delArticle: ', res.data);
            this.getArticles();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
