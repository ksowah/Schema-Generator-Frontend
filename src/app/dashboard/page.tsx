"use client"

import Header from '@/layouts/Header'
import { currentUserVar } from '@/worker/auth';
import { useReactiveVar } from '@apollo/client';
import { useDisclosure } from '@mantine/hooks';
import React from 'react'

const DashboardPage = () => {
  const [sideBaropened, { toggle }] = useDisclosure();
  const currectUser: User | undefined = useReactiveVar(currentUserVar)
  const firstName = currectUser?.fullName.split(" ")[0]
  return (
      <div className="flex flex-1 overflow-y-auto">
        <Header
        opened={sideBaropened}
        toggle={toggle}
      />
        <div className="flex-1 min-h-full mx-auto  p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12 lg:gap-8">
            <div className="col-span-12">
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="relative isolate overflow-hidden rounded-lg bg-primary-400 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 row-span-2">
                  {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),white)] opacity-20" /> */}
                  <div className="absolute inset-y-0 right-8 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-15deg] bg-primary-500 shadow-xl shadow-primary-400 ring-1 ring-primary-400 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                  <div className="absolute inset-y-0 right-24 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-20deg] bg-primary-600 shadow-xl shadow-primary-500 ring-1 ring-primary-500 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary-600/80 to-primary-600" />
                  <div className="mx-auto text-white max-w-2xl lg:max-w-4xl">
                    <p>Welcome back,</p>
                    <h3 className="text-4xl font-medium">
                      {firstName}
                    </h3>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DashboardPage