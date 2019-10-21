/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  TitleAndSubtitle,
  ContentPanel,
  SkillsPanel,
  WorkExperiencesPanel,
  EditSkill,
  EditWorkExperience,
} from 'components'
import { PROGRAMMING_SCOPES } from 'constants'
import { Box } from '@smooth-ui/core-em'
import road from 'images/road.jpg'
import { Link, Modal } from 'uiCommons'
import { useLoggedUser } from 'components/utils/useLoggedUser'
import {
  GET_RESUME,
  CREATE_SKILL_MUTATION,
  REMOVE_SKILL_MUTATION,
  UPDATE_SKILL_MUTATION,
  CREATE_WORK_EXPERIENCE_MUTATION,
  REMOVE_WORK_EXPERIENCE_MUTATION,
  UPDATE_WORK_EXPERIENCE_MUTATION,
  useCRUDMutation,
} from 'graphqlSchema'
import resumePdf from '../static/nicolas-tudela-cv.pdf'

const ENTITY_TYPES = { SKILL: 'Skill', WORK_EXPERIENCE: 'Work Experience' }

const Resume = () => {
  const { loading: resumeLoading, error, data } = useQuery(GET_RESUME)
  const [updateSkill, { loading: updateSkillLoading }] = useMutation(
    UPDATE_SKILL_MUTATION.gql
  )
  const [
    updateWorkExperience,
    { loading: updateWorkExperienceLoading },
  ] = useMutation(UPDATE_WORK_EXPERIENCE_MUTATION.gql)
  const [createSkill, { loading: createSkillLoading }] = useCRUDMutation(
    CREATE_SKILL_MUTATION,
    {
      queryToRefresh: GET_RESUME,
      objectToRefresh: 'resume',
      refreshOperation: (resume, createdSkill) => {
        return { skills: resume.skills.concat([createdSkill]) }
      },
    }
  )

  const [
    createWorkExperience,
    { loading: createWorkExperienceLoading },
  ] = useCRUDMutation(CREATE_WORK_EXPERIENCE_MUTATION, {
    queryToRefresh: GET_RESUME,
    objectToRefresh: 'resume',
    refreshOperation: (resume, createdWorkExperience) => {
      return {
        workExperiences: resume.workExperiences.concat([createdWorkExperience]),
      }
    },
  })

  const [
    removeWorkExperience,
    { loading: removeWorkExperienceLoading },
  ] = useCRUDMutation(REMOVE_WORK_EXPERIENCE_MUTATION, {
    queryToRefresh: GET_RESUME,
    objectToRefresh: 'resume',
    refreshOperation: (resume, removedId) => {
      return {
        workExperiences: resume.workExperiences.filter(
          experience => experience._id !== removedId
        ),
      }
    },
  })

  const [removeSkill, { loading: removeSkillLoading }] = useCRUDMutation(
    REMOVE_SKILL_MUTATION,
    {
      queryToRefresh: GET_RESUME,
      objectToRefresh: 'resume',
      refreshOperation: (resume, skillRemovedId) => {
        return {
          skills: resume.skills.filter(skill => skill._id !== skillRemovedId),
        }
      },
    }
  )
  const [selectedScope, setSelectedScope] = useState(
    PROGRAMMING_SCOPES.FULL_STACK
  )
  const { loggedUser, userLoading } = useLoggedUser()
  const [selectedEntity, setSelectedEntity] = useState(null)

  const onCreate = type => {
    setSelectedEntity({ type })
  }

  const onEdit = (type, entity) => {
    setSelectedEntity({ type, id: entity._id, entity })
  }

  const onRemove = (type, entity) => {
    if (type === ENTITY_TYPES.SKILL) {
      removeSkill({ variables: { id: entity._id } })
    }
    if (type === ENTITY_TYPES.WORK_EXPERIENCE) {
      removeWorkExperience({ variables: { id: entity._id } })
    }
  }

  const onCloseModal = () => {
    setSelectedEntity(null)
  }

  const onSaveEntity = (type, { _id, __typename, ...entity }) => {
    if (type === ENTITY_TYPES.SKILL) {
      if (_id) {
        updateSkill({ variables: { id: _id, skill: entity } })
      } else {
        createSkill({ variables: { skill: entity } })
      }
    }
    if (type === ENTITY_TYPES.WORK_EXPERIENCE) {
      if (_id) {
        updateWorkExperience({ variables: { id: _id, workExperience: entity } })
      } else {
        createWorkExperience({ variables: { workExperience: entity } })
      }
    }
    // close modal && refresh skills or workExperiences?
    setSelectedEntity(null)
  }

  const modalTitle = selectedEntity
    ? `${selectedEntity.id ? 'Edit' : 'Create'} ${selectedEntity.type}`
    : ''

  const loading = resumeLoading || userLoading

  const skillsLoading =
    loading || createSkillLoading || removeSkillLoading || updateSkillLoading

  const workExperienceLoading =
    loading ||
    createWorkExperienceLoading ||
    removeWorkExperienceLoading ||
    updateWorkExperienceLoading

  return (
    <>
      <Modal
        title={modalTitle}
        withCloseButton
        open={!!selectedEntity}
        // open={true}
        onClose={onCloseModal}
        fullWidth={
          selectedEntity && selectedEntity.type === ENTITY_TYPES.WORK_EXPERIENCE
        }
      >
        {selectedEntity && selectedEntity.type === ENTITY_TYPES.SKILL && (
          <EditSkill
            onSave={skill => onSaveEntity(ENTITY_TYPES.SKILL, skill)}
            onClose={onCloseModal}
            skill={selectedEntity.entity}
          />
        )}
        {selectedEntity &&
          selectedEntity.type === ENTITY_TYPES.WORK_EXPERIENCE && (
            <EditWorkExperience
              onSave={skill =>
                onSaveEntity(ENTITY_TYPES.WORK_EXPERIENCE, skill)
              }
              onClose={onCloseModal}
              experience={selectedEntity.entity}
            />
          )}
      </Modal>
      <ContentPanel
        color="gray"
        width={{ sm: 6 / 7, lg: 1 }}
        backgroundImage={`url(${road});`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        {({ color }) => (
          <>
            <Box m="auto" width={{ sm: 6 / 7, lg: 6 / 7 }}>
              <TitleAndSubtitle
                textAlign="unset"
                title="THE ONLY SOURCE OF KNOWLEDGE IS EXPERIENCE"
                color={color}
              />
              <Link color="darkBlue" href={resumePdf}>
                Download resume
              </Link>
            </Box>
          </>
        )}
      </ContentPanel>
      <SkillsPanel
        skills={data.resume ? data.resume.skills : []}
        loading={skillsLoading}
        selectedScope={selectedScope}
        onScopeSelection={setSelectedScope}
        error={error}
        user={loggedUser}
        onCreate={() => onCreate(ENTITY_TYPES.SKILL)}
        onRemove={skill => onRemove(ENTITY_TYPES.SKILL, skill)}
        onEdit={skill => onEdit(ENTITY_TYPES.SKILL, skill)}
      />
      <WorkExperiencesPanel
        experiences={data.resume ? data.resume.workExperiences : []}
        loading={workExperienceLoading}
        selectedScope={selectedScope}
        onScopeSelection={setSelectedScope}
        error={error}
        user={loggedUser}
        onCreate={() => onCreate(ENTITY_TYPES.WORK_EXPERIENCE)}
        onRemove={experience =>
          onRemove(ENTITY_TYPES.WORK_EXPERIENCE, experience)
        }
        onEdit={experience => onEdit(ENTITY_TYPES.WORK_EXPERIENCE, experience)}
      />
    </>
  )
}
export default Resume
