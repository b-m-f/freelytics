<template>
  <Layout>
    <Sider>left sidebar</Sider>
    <Layout>
      <Header>header</Header>
      <Content>
        <nuxt />
      </Content>
      <Footer>footer</Footer>
    </Layout>
  </Layout>
</template>

<script>
import { Layout } from 'ant-design-vue'

export default {
  components: {
    Layout,
    Header: Layout.Header,
    Footer: Layout.Footer,
    Content: Layout.Content,
    Sider: Layout.Sider
  }
}
</script>

<style></style>
