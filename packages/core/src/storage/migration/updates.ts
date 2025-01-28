import type { V0_1ToV0_2UpdateConfig } from './updates/0.1-0.2'
import type { BaseAgent } from '../../agent/BaseAgent'
import type { VersionString } from '../../utils/version'

import { updateV0_1ToV0_2 } from './updates/0.1-0.2'
import { updateV0_2ToV0_3 } from './updates/0.2-0.3'
import { updateV0_3ToV0_3_1 } from './updates/0.3-0.3.1'
import { updateV0_3_1ToV0_4 } from './updates/0.3.1-0.4'
import { updateV0_4ToV0_5 } from './updates/0.4-0.5'
import { updateV0_5ToV0_6 } from './updates/0.5-0.6'

export const INITIAL_STORAGE_VERSION = '0.1'

export interface Update {
  fromVersion: VersionString
  toVersion: VersionString
  doUpdate: <Agent extends BaseAgent>(agent: Agent, updateConfig: UpdateConfig) => Promise<void>
}

export interface UpdateConfig {
  v0_1ToV0_2: V0_1ToV0_2UpdateConfig
}

export const DEFAULT_UPDATE_CONFIG: UpdateConfig = {
  v0_1ToV0_2: {
    mediationRoleUpdateStrategy: 'recipientIfEndpoint',
  },
}

export const supportedUpdates = [
  {
    fromVersion: '0.1',
    toVersion: '0.2',
    doUpdate: updateV0_1ToV0_2,
  },
  {
    fromVersion: '0.2',
    toVersion: '0.3',
    doUpdate: updateV0_2ToV0_3,
  },
  {
    fromVersion: '0.3',
    toVersion: '0.3.1',
    doUpdate: updateV0_3ToV0_3_1,
  },
  {
    fromVersion: '0.3.1',
    toVersion: '0.4',
    doUpdate: updateV0_3_1ToV0_4,
  },
  {
    fromVersion: '0.4',
    toVersion: '0.5',
    doUpdate: updateV0_4ToV0_5,
  },
  {
    fromVersion: '0.5',
    toVersion: '0.6',
    doUpdate: updateV0_5ToV0_6,
  },
] as const

// Current version is last toVersion from the supported updates
export const CURRENT_FRAMEWORK_STORAGE_VERSION = supportedUpdates[supportedUpdates.length - 1].toVersion as LastItem<
  typeof supportedUpdates
>['toVersion']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LastItem<T extends readonly unknown[]> = T extends readonly [...infer _, infer U] ? U : T[0] | undefined
export type UpdateToVersion = (typeof supportedUpdates)[number]['toVersion']
