import { defineStore } from 'pinia'
import organizationService, {
  OrganizationInfo,
  CreateOrgRequest,
  CreateOrgResponse,
} from '@/services/organizationService'

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organizations: [] as OrganizationInfo[],
    currentOrganization: null as OrganizationInfo | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getOrganizationById: (state) => (oid: number) =>
      state.organizations.find((org) => org.oid === oid),
  },

  actions: {
    // 加载组织列表
    async loadOrganizations() {
      this.loading = true
      try {
        const response = await organizationService.getOrgs()
        this.organizations = response.data.data
        this.error = null
      } catch (error: any) {
        this.error = error.message || '获取组织列表失败'
      } finally {
        this.loading = false
      }
    },

    // 加载组织详情
    async loadOrganizationDetail(oid: number) {
      this.loading = true
      try {
        const response = await organizationService.getOrgDetail(oid)

        // 更新当前组织
        this.currentOrganization = response.data.data

        // 更新组织列表中的对应组织
        const index = this.organizations.findIndex((org) => org.oid === oid)
        if (index !== -1) {
          this.organizations[index] = response.data.data
        } else {
          this.organizations.push(response.data.data)
        }

        this.error = null
      } catch (error: any) {
        this.error = error.message || '获取组织详情失败'
      } finally {
        this.loading = false
      }
    },

    // 创建组织
    async createOrganization(orgData: CreateOrgRequest): Promise<CreateOrgResponse> {
      this.loading = true
      try {
        const response = await organizationService.createOrg(orgData)

        // 重新加载组织列表
        await this.loadOrganizations()

        this.error = null
        return response.data.data
      } catch (error: any) {
        this.error = error.message || '创建组织失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 更新组织
    async updateOrganization(oid: number, orgData: Partial<CreateOrgRequest>) {
      this.loading = true
      try {
        await organizationService.updateOrg(oid, orgData)

        // 更新本地状态
        const org = this.organizations.find((o) => o.oid === oid)
        if (org) {
          if (orgData.orgName) org.orgName = orgData.orgName
          if (orgData.remark) org.remark = orgData.remark
        }

        // 如果是当前组织，也更新当前组织
        if (this.currentOrganization?.oid === oid) {
          this.currentOrganization = { ...this.currentOrganization, ...orgData }
        }

        this.error = null
      } catch (error: any) {
        this.error = error.message || '更新组织失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 删除组织
    async deleteOrganization(oid: number) {
      this.loading = true
      try {
        await organizationService.deleteOrg(oid)

        // 从本地状态中移除
        this.organizations = this.organizations.filter((org) => org.oid !== oid)

        // 如果是当前组织，清空当前组织
        if (this.currentOrganization?.oid === oid) {
          this.currentOrganization = null
        }

        this.error = null
      } catch (error: any) {
        this.error = error.message || '删除组织失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 设置当前组织
    setCurrentOrganization(oid: number) {
      const org = this.organizations.find((o) => o.oid === oid)
      if (org) {
        this.currentOrganization = org
      }
    },

    // 重置状态
    reset() {
      this.organizations = []
      this.currentOrganization = null
      this.error = null
    },
  },
})
