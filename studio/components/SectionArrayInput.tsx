import React from 'react'
import { ArrayOfObjectsInput, type ArrayOfObjectsInputProps, PatchEvent, set, unset } from 'sanity'
import { Card, Stack, Text, Grid, Button, Flex, Switch, Tooltip, Box } from '@sanity/ui'
import { AddIcon, DragHandleIcon, TrashIcon, EditIcon } from '@sanity/icons'
import { getSectionTypes } from '../schemas/utils/getSectionTypes'
import { SectionPreview } from './SectionPreview'

interface Section {
  _key: string
  _type: string
  enabled: boolean
  [key: string]: any
}

type SectionInputProps = Omit<ArrayOfObjectsInputProps, 'value'> & {
  value?: Section[]
}

export function SectionArrayInput(props: SectionInputProps) {
  const { onChange, value = [], schemaType } = props
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null)

  const sectionTypes = getSectionTypes()

  const handleAddSection = (type: string) => {
    const newSection: Section = {
      _key: `${type}_${Date.now()}`,
      _type: type,
      enabled: true
    }
    
    onChange(PatchEvent.from([
      set([...value, newSection])
    ]))
  }

  const handleToggleSection = (item: Section) => {
    const newValue = value.map(section => 
      section._key === item._key 
        ? { ...section, enabled: !section.enabled }
        : section
    )
    onChange(PatchEvent.from([set(newValue)]))
  }

  const handleRemoveSection = (item: Section) => {
    const newValue = value.filter(section => section._key !== item._key)
    onChange(PatchEvent.from([set(newValue)]))
    setSelectedSection(null)
  }

  const handleSectionContentChange = (item: Section, patchEvent: any) => {
    const updatedSection = patchEvent.patches?.[0]?.value?.[0]
    
    if (updatedSection) {
      const newValue = value.map(section =>
        section._key === item._key ? { ...updatedSection, enabled: section.enabled } : section
      )
      onChange(PatchEvent.from([set(newValue)]))
    }
  }

  const getSectionInfo = (type: string) => {
    return sectionTypes.find(t => t.type === type) || {
      title: type,
      icon: DragHandleIcon,
      description: 'Keine Beschreibung verfügbar'
    }
  }

  // If a section is selected, show its edit form
  if (selectedSection) {
    const section = value.find(item => item._key === selectedSection)
    if (!section) return null

    const sectionInfo = getSectionInfo(section._type)

    return (
      <Stack space={4}>
        <Card padding={4} radius={2} tone="primary">
          <Stack space={4}>
            {/* Header */}
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={3}>
                <Button
                  icon={DragHandleIcon}
                  mode="ghost"
                  onClick={() => setSelectedSection(null)}
                  text="Zurück zur Übersicht"
                />
                <Text weight="semibold">{sectionInfo.title} bearbeiten</Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Switch
                  checked={section.enabled}
                  onChange={() => handleToggleSection(section)}
                />
                <Button
                  tone="critical"
                  icon={TrashIcon}
                  mode="ghost"
                  onClick={() => handleRemoveSection(section)}
                />
              </Flex>
            </Flex>

            {/* Preview */}
            <SectionPreview value={section} />

            {/* Edit Form */}
            <Card padding={4} radius={2} tone="default">
              <ArrayOfObjectsInput
                {...props}
                value={[section]}
                onChange={(patchEvent) => handleSectionContentChange(section, patchEvent)}
              />
            </Card>
          </Stack>
        </Card>
      </Stack>
    )
  }

  // Otherwise show the overview
  return (
    <Stack space={4}>
      <Card padding={4} radius={2} tone="primary">
        <Stack space={4}>
          {/* Active Sections */}
          <Stack space={2}>
            <Text weight="semibold" size={2}>Aktive Sektionen</Text>
            <Grid columns={1} gap={4}>
              {value.map((item, index) => {
                const sectionInfo = getSectionInfo(item._type)
                const Icon = sectionInfo.icon
                
                return (
                  <Card 
                    key={item._key}
                    tone={item.enabled ? 'primary' : 'critical'}
                    padding={4}
                    radius={2}
                    shadow={1}
                  >
                    <Stack space={3}>
                      <Flex align="center" justify="space-between">
                        <Flex align="center" gap={3}>
                          <DragHandleIcon />
                          <Icon />
                          <Stack space={2}>
                            <Text weight="semibold">
                              {index + 1}. {sectionInfo.title}
                            </Text>
                            <Text size={1} muted>
                              {item.enabled ? 'Aktiviert' : 'Deaktiviert'}
                            </Text>
                          </Stack>
                        </Flex>
                        <Flex align="center" gap={3}>
                          <Switch
                            checked={item.enabled}
                            onChange={() => handleToggleSection(item)}
                          />
                          <Button
                            tone="primary"
                            icon={EditIcon}
                            mode="ghost"
                            onClick={() => setSelectedSection(item._key)}
                            text="Bearbeiten"
                          />
                          <Button
                            tone="critical"
                            icon={TrashIcon}
                            mode="ghost"
                            onClick={() => handleRemoveSection(item)}
                          />
                        </Flex>
                      </Flex>
                      <SectionPreview value={item} />
                    </Stack>
                  </Card>
                )
              })}
            </Grid>
          </Stack>

          {/* Add Section */}
          <Stack space={2}>
            <Text weight="semibold" size={2}>Sektion hinzufügen</Text>
            <Grid columns={[2, 2, 3]} gap={4}>
              {sectionTypes.map((sectionType) => {
                const Icon = sectionType.icon
                return (
                  <Tooltip
                    key={sectionType.type}
                    content={
                      <Box padding={2}>
                        <Text size={1}>{sectionType.description}</Text>
                      </Box>
                    }
                    placement="top"
                  >
                    <Button
                      tone="primary"
                      mode="ghost"
                      padding={4}
                      onClick={() => handleAddSection(sectionType.type)}
                    >
                      <Flex direction="column" align="center" gap={3}>
                        <Icon />
                        <Text size={1}>{sectionType.title}</Text>
                      </Flex>
                    </Button>
                  </Tooltip>
                )
              })}
            </Grid>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
