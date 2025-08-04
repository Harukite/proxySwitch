import React, { useState, useRef } from 'react'
import { Upload, Download, FileText, X, AlertCircle, CheckCircle } from 'lucide-react'
import type { ProxyConfig } from '~utils/types'
import { Button, Card, Input } from './UI'
import { 
  importProxiesFromCSV, 
  exportProxiesToCSV, 
  downloadCSV, 
  readFileAsText,
  generateSampleCSV 
} from '~utils/csv'

interface ImportExportProps {
  onImport: (proxies: ProxyConfig[]) => void
  onExport: () => ProxyConfig[]
  onClose: () => void
}

export const ImportExport: React.FC<ImportExportProps> = ({
  onImport,
  onExport,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import')
  const [loading, setLoading] = useState(false)
  const [importResult, setImportResult] = useState<{
    success: ProxyConfig[]
    errors: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setImportResult(null)

    try {
      const content = await readFileAsText(file)
      const result = await importProxiesFromCSV(content)
      setImportResult(result)
    } catch (error) {
      setImportResult({
        success: [],
        errors: [`文件读取失败: ${(error as Error).message}`]
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImportConfirm = () => {
    if (importResult?.success.length) {
      onImport(importResult.success)
      onClose()
    }
  }

  const handleExport = () => {
    const proxies = onExport()
    if (proxies.length === 0) {
      alert('没有可导出的代理配置')
      return
    }

    const csvContent = exportProxiesToCSV(proxies)
    const filename = `proxies_${new Date().toISOString().split('T')[0]}.csv`
    downloadCSV(csvContent, filename)
  }

  const handleDownloadSample = () => {
    const sampleContent = generateSampleCSV()
    downloadCSV(sampleContent, 'proxy_sample.csv')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary">
            导入/导出代理配置
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* 选项卡 */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'import'
                ? 'border-primary-color text-primary-color'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload size={16} className="inline mr-2" />
            导入
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'export'
                ? 'border-primary-color text-primary-color'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Download size={16} className="inline mr-2" />
            导出
          </button>
        </div>

        {/* 导入选项卡 */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">
                批量导入代理配置
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  <FileText size={16} className="inline mr-2" />
                  CSV 格式说明
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 文件格式：CSV (逗号分隔值)</li>
                  <li>• 列顺序：名称, 类型, IP地址, 端口, 用户名, 密码</li>
                  <li>• 支持的代理类型：HTTP, HTTPS, SOCKS4, SOCKS5</li>
                  <li>• 用户名和密码可以为空</li>
                </ul>
                
                <Button
                  size="small"
                  variant="secondary"
                  onClick={handleDownloadSample}
                  className="mt-3"
                >
                  <Download size={14} />
                  下载示例文件
                </Button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  选择 CSV 文件或拖拽到此处
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  loading={loading}
                >
                  选择文件
                </Button>
              </div>
            </div>

            {/* 导入结果 */}
            {importResult && (
              <div className="space-y-4">
                {importResult.success.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <CheckCircle size={16} className="mr-2" />
                      成功解析 {importResult.success.length} 个代理配置
                    </h4>
                    <div className="max-h-32 overflow-y-auto">
                      {importResult.success.map((proxy, index) => (
                        <div key={index} className="text-sm text-green-700 py-1">
                          {proxy.name} - {proxy.type.toUpperCase()} {proxy.host}:{proxy.port}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {importResult.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center">
                      <AlertCircle size={16} className="mr-2" />
                      发现 {importResult.errors.length} 个错误
                    </h4>
                    <div className="max-h-32 overflow-y-auto">
                      {importResult.errors.map((error, index) => (
                        <div key={index} className="text-sm text-red-700 py-1">
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {importResult.success.length > 0 && (
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setImportResult(null)}
                      className="flex-1"
                    >
                      重新选择
                    </Button>
                    <Button
                      onClick={handleImportConfirm}
                      className="flex-1"
                    >
                      确认导入 ({importResult.success.length})
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 导出选项卡 */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-primary mb-4">
                导出代理配置
              </h3>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-gray-700 mb-4">
                  将当前所有代理配置导出为 CSV 文件，可以在其他设备上导入使用。
                </p>
                <p className="text-sm text-gray-600">
                  导出的文件包含代理名称、类型、地址、端口以及认证信息（如果有的话）。
                </p>
              </div>

              <div className="text-center">
                <Button
                  onClick={handleExport}
                  size="large"
                  className="px-8"
                >
                  <Download size={20} />
                  导出所有代理配置
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
